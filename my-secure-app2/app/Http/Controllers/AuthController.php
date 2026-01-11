<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['logout','user']);
    } 

    // Login
    public function Login(Request $request){
        if(Auth::attempt($request->only('email', 'password')))
        {
            $request->session()->regenerate();
            return response()->json([
                'message' => 'تم تسجيل دخول',
            ],200);
        }

        return response()->json([
            'message' => 'البريد الكتروني او كلمة سر خاطئة'
        ],422);
    }

    // Register
    public function Register(Request $request){
        $user = User::create([
            'name' => $request->name,
            'email' =>$request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'message' => 'تم انشاء الحساب بنجاح',
            'user' => $user,
        ],200);
    }

    // User
    public function User(Request $request){
        return response()->json([
            'message' => 'المستخدم الحالي ',
            'user' => $request->user(),
        ],200);
    }

    // Logout
    public function Logout(Request $request){
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'تم تسجيل الخروج'],200);
    }
}
