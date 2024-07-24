import { Separator } from "@/components/ui/separator"
import { EditSubForm } from "./editsuborg-from"

export default function EditSubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Edit Sub Organizations</h3>
        <p className="text-sm text-muted-foreground">
          Edit previously made suboragnizations on blockchain
        </p>
      </div>
      <Separator />
      <EditSubForm />
    </div>
  )
}