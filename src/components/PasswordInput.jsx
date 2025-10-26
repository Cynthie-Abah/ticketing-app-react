import { Eye, EyeClosed, Lock } from "lucide-react";
import { useState } from "react";

export default function PasswordInput({errors, ...props}) {
    const [viewPassword, setViewPassword] = useState(false);
return (
    <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
        type={viewPassword ? 'text' : "password"}
        className={`w-full pl-10 pr-4 py-3 border ${
            errors.password ? 'border-red-500' : 'border-gray-300'
        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
        {...props}
        />
        <button tabIndex={0} onClick={()=> setViewPassword(!viewPassword)}>
            { viewPassword ? 
                <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"/>
            : <EyeClosed className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            }
        </button>
    </div>
)
}
