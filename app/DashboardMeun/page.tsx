import Dashboard from '@/components/Dashboard'
import EditForm from '@/components/EditForm'

export default function dashboardMenuPage() {
    return (
        <div className="p-6 min-h-full bg-gray-300  ">
            <div className="max-w-5xl mx-auto space-y-8">
                <Dashboard />
                <div className="flex flex-col items-center">
                    <EditForm />
                </div>
            </div>
        </div>
    )
}
