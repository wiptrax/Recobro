import { Separator } from "@/components/ui/separator"
import { FoundComplainForm } from "./foundcomplain-from" 

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Create New Found Complain</h3>
      </div>
      <Separator />
      <FoundComplainForm />
    </div>
  )
}