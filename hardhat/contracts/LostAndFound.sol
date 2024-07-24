// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title LostAndFound
 * @dev This contract allows users to file lost and found complaints. Only sub-organization admins can resolve found complaints.
 */
contract LostAndFound is Ownable {

    // Making the deployer of this contract the Ownwer of this contract
    constructor() Ownable(msg.sender) {}

    // Struct to represent a complaint
    struct Complaint {
        string name;
        uint256 subOrgId;
        address walletAddress;
        string email;
        string description;
        string[] images;
        bool isResolved;
        bool isLost;
    }

    // Struct to represent a sub-organization
    struct SubOrganization {
        address[] admins;
        string name;
        bool exists;
    }

    // Mapping from sub-organization ID to SubOrganization struct
    mapping(uint256 => SubOrganization) public subOrganizations;

    // Mapping from complaint ID to Complaint struct
    mapping(uint256 => Complaint) public complaints;

    // Counter for complaint IDs
    uint256 public complaintCounter;

    // Event emitted when a new sub-organization is created
    event SubOrganizationCreated(uint256 indexed subOrgId, address[] admins, string name);

    // Event emitted when a new complaint is filed
    event ComplaintFiled(uint256 indexed complaintId, bool isLost);

    // Event emitted when a complaint is resolved
    event ComplaintResolved(uint256 indexed complaintId);

    // Event emitted when sub-organization admins are updated
    event SubOrganizationAdminsUpdated(uint256 indexed subOrgId, address[] newAdmins);

    /**
     * @notice Creates a new sub-organization with specific admins.
     * @dev Only the owner of the contract can create new sub-organizations.
     * @param subOrgId The unique ID of the sub-organization.
     * @param admins The addresses of the administrators for the sub-organization.
     * @param name The name of the sub-organization.
     */
    function createSubOrganization(uint256 subOrgId, address[] memory admins, string memory name) external onlyOwner {
        require(!subOrganizations[subOrgId].exists, "Sub-organization already exists.");
        require(admins.length > 0, "At least one admin is required.");

        subOrganizations[subOrgId] = SubOrganization({
            admins: admins,
            name: name,
            exists: true
        });

        emit SubOrganizationCreated(subOrgId, admins, name);
    }

    /**
     * @notice Updates the admins of a specific sub-organization.
     * @dev Only the owner of the contract can update admins.
     * @param subOrgId The unique ID of the sub-organization.
     * @param newAdmins The new addresses of the administrators for the sub-organization.
     */
    function updateSubOrganizationAdmins(uint256 subOrgId, address[] memory newAdmins) external onlyOwner {
        require(subOrganizations[subOrgId].exists, "Sub-organization does not exist.");
        require(newAdmins.length > 0, "At least one admin is required.");

        subOrganizations[subOrgId].admins = newAdmins;

        emit SubOrganizationAdminsUpdated(subOrgId, newAdmins);
    }

    /**
     * @notice Files a lost complaint with specified parameters.
     * @param name The name of the person filing the complaint.
     * @param subOrgId The ID of the sub-organization.
     * @param walletAddress The wallet address of the person filing the complaint.
     * @param email The email address of the person filing the complaint.
     * @param description A description of the lost item.
     * @param images An array of image links or data of the lost item.
     */
    function fileLostComplaint(
        string memory name,
        uint256 subOrgId,
        address walletAddress,
        string memory email,
        string memory description,
        string[] memory images
    ) external {
        require(subOrganizations[subOrgId].exists, "Sub-organization does not exist.");

        complaints[complaintCounter] = Complaint({
            name: name,
            subOrgId: subOrgId,
            walletAddress: walletAddress,
            email: email,
            description: description,
            images: images,
            isResolved: false,
            isLost: true
        });

        emit ComplaintFiled(complaintCounter, true);
        complaintCounter++;
    }

    /**
     * @notice Files a found complaint with specified parameters.
     * @param name The name of the person filing the complaint.
     * @param subOrgId The ID of the sub-organization.
     * @param walletAddress The wallet address of the person filing the complaint.
     * @param email The email address of the person filing the complaint.
     * @param description A description of the found item.
     * @param images An array of image links or data of the found item.
     */
    function fileFoundComplaint(
        string memory name,
        uint256 subOrgId,
        address walletAddress,
        string memory email,
        string memory description,
        string[] memory images
    ) external {
        require(subOrganizations[subOrgId].exists, "Sub-organization does not exist.");

        complaints[complaintCounter] = Complaint({
            name: name,
            subOrgId: subOrgId,
            walletAddress: walletAddress,
            email: email,
            description: description,
            images: images,
            isResolved: false,
            isLost: false
        });

        emit ComplaintFiled(complaintCounter, false);
        complaintCounter++;
    }

    /**
     * @notice Resolves a found complaint.
     * @dev Only an admin of the relevant sub-organization can resolve the complaint.
     * @param complaintId The ID of the complaint to resolve.
     */
    function resolveComplaint(uint256 complaintId) external {
        Complaint storage complaint = complaints[complaintId];
        require(!complaint.isResolved, "Complaint is already resolved.");
        require(isAdmin(complaint.subOrgId, msg.sender), "Caller is not an admin of the relevant sub-organization.");

        complaint.isResolved = true;

        emit ComplaintResolved(complaintId);
    }

    /**
     * @notice Lists all complaints (lost and found) for a specific sub-organization.
     * @param subOrgId The ID of the sub-organization.
     * @return An array of complaint IDs related to the sub-organization.
     */
    function listComplaints(uint256 subOrgId) external view returns (uint256[] memory) {
        require(subOrganizations[subOrgId].exists, "Sub-organization does not exist.");

        uint256[] memory subOrgComplaints = new uint256[](complaintCounter);
        uint256 count = 0;

        for (uint256 i = 0; i < complaintCounter; i++) {
            if (complaints[i].subOrgId == subOrgId) {
                subOrgComplaints[count] = i;
                count++;
            }
        }

        // Resize the array to the correct size
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = subOrgComplaints[i];
        }

        return result;
    }

    /**
     * @notice Checks if a given address is an admin of a specific sub-organization.
     * @param subOrgId The ID of the sub-organization.
     * @param user The address to check.
     * @return True if the user is an admin, false otherwise.
     */
    function isAdmin(uint256 subOrgId, address user) public view returns (bool) {
        if (!subOrganizations[subOrgId].exists) return false;
        address[] memory admins = subOrganizations[subOrgId].admins;
        for (uint256 i = 0; i < admins.length; i++) {
            if (admins[i] == user) {
                return true;
            }
        }
        return false;
    }

    /**
     * @notice Retrieves the list of admin addresses for a specific sub-organization.
     * @param subOrgId The ID of the sub-organization.
     * @return The list of admin addresses of the sub-organization.
     */
    function getAdmins(uint256 subOrgId) external view returns (address[] memory) {
        require(subOrganizations[subOrgId].exists, "Sub-organization does not exist.");
        return subOrganizations[subOrgId].admins;
    }
}
