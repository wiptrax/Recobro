import { Separator } from "@/components/ui/separator"
import { CreateSubForm } from "./createsuborg-from"

export default function CreateSubPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Create Sub Organizations</h3>
        <p className="text-sm text-muted-foreground">
          Create your suboragnizations on blockchain
        </p>
      </div>
      <Separator />
      <CreateSubForm />
    </div>
  )
}