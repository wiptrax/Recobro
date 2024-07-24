import { Separator } from "@/components/ui/separator"
import { LostComplainForm } from "./lostcomplain-from" 

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Create New Lost Complain</h3>
      </div>
      <Separator />
      <LostComplainForm />
    </div>
  )
}