<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /** @var \App\Models\User $user */
    //
    public function index()
    {
        $auth = Auth::user();
        return response()->json([
            'status' => true,
            'data' => $auth,
        ]);
    }

    public function login(Request $request)
    {

        $validate = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($validate)) {
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            return response()->json([
                'status' => true,
                'data' => [
                    'token' => $token,
                    'user' => $user,
                ],
            ], 200)
                ->cookie(
                    'token',
                    $token,
                    60 * 24, // 24 hours
                    '/',
                    null,
                    config('app.env') === 'production', // secure only in production
                    true,  // httpOnly (JavaScript cannot access)
                    false,
                    'None' // Allow cross-site cookie sending
                );
        }

        return response()->json([
            'status' => false,
            'data' => $validate,
        ]);
    }

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();
        return response()->json([
            'status' => true,
            'data' => "Logout successfully",
        ])
            ->cookie(
                'token',
                '',
                -1,
                '/',
                null,
                config('app.env') === 'production',
                true,
                false,
                'None'
            );
    }
}
