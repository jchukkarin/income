import Dashboard from '@/components/Dashboard'
import RecordForm from '@/components/RecordForm'

export default function CreatePage() {
    return (
        <div className="p-6 min-h-full bg-gray-300  ">
            <div className="max-w-5xl mx-auto space-y-8">
                <Dashboard />
                <div className="flex flex-col items-center">
                    <RecordForm />
                </div>
            </div>
        </div>
    )
}
