<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Auth\UserLoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use Exception;

class AuthController extends Controller
{
    public function login(UserLoginRequest $request)
    {
        try{
            $credentials = $request->only('email', 'password');
    
            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $token = $user->createToken('authToken')->plainTextToken;
                $user['token'] = $token;

                return response()->json($user);
            } else {
                return response()->json([
                    'message' => 'Invalid credentials',
                    'status' => Response::HTTP_UNAUTHORIZED
                ]);
            }
        }catch (Exception $e){
            return response()->json([
                'message' => $e->getMessage(),
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
    }

    public function logout(Request $request)
    {
        $user = $request->user(); 
        // return response()->json($user);
        if ($user) {
            $user->tokens()->delete();

            return response()->json([
                'message' => 'Logout successfully.',
                'status' => 200
            ]);
        } else {
            return response()->json([
                'message' => 'User not authenticated.',
                'status' => 401
            ], 401);
        }
    }
}
