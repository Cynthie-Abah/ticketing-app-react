import { useAuth } from "../contexts/AuthContext";

export default function SignoutModal({setOpen}) {
    const {signOut} = useAuth();

    const handleSignout = async ()=>{
    await signOut()
    setOpen(false)
    }
return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
<div className="bg-amber-200 p-6 rounded-2xl shadow-xl text-center max-w-sm w-full">
    <h2 className="text-lg font-semibold mb-4">Are you sure you want to sign out?</h2>
    <div className="flex justify-center gap-3">
    <button
        onClick={handleSignout}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
    >
        Yes, Sign Out
    </button>
    <button
        onClick={()=> setOpen(false)}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
    >
        Cancel
    </button>
    </div>
</div>
</div>

)
}
