<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Faker\Provider\Person;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

class UserController extends Controller
{
    public function register(RegisterRequest $request) //here go for validation using RegisterRequest and authorization
    {
        // $user = $request->all();
        $user = $request->validated();

        //iske like aalag se service layer banega or usme ye logic jayega
        // $user["password"] = bcrypt($user["password"]);
        $user['password'] = Hash::make($user['password']);

        $user = User::create($user);
       

        return response()->json([
            "result" => "success",
            "message" => "user created successfully",
            "userName" => $user->name
        ], 201);
    }
    public function checkHash(Request $request)
    {
        $getPersonalAccessToken = $request->user()->currentAccessToken();
        echo "hello";
        echo $getPersonalAccessToken->id;
        $isValid = Hash::check($request->token, $getPersonalAccessToken->token);
        return $isValid;
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Optional: Delete old tokens for security
        $user->tokens()->delete();

        // $request->session()->regenerate();

        $token = $user->createToken('auth-token', ['*'], now()->addHours(2))->plainTextToken;

        $cookie = cookie(
            'token',                    // name
            $token,                     // value
            60,               // 60 min in minutes
            '/',                        // path
            null,                       // domain (null = current domain)
            true,                       // secure (HTTPS only)
            false,                       // httpOnly (no JS access)
            false,                      // raw
            'lax'                      // sameSite ('none', 'lax', or 'strict')
        );

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email
            ]
        ], 200)->cookie($cookie);
    }

    public function profile(Request $request)
    {
        $token = $request->bearerToken();

        // if (!$token) {
        //     return response()->json([
        //         "status" => false,
        //         "message" => "token not provided"
        //     ], 401);
        // }

        // echo "token: " . $token;

        $accessToken = PersonalAccessToken::findToken($token);

        $user = User::find($accessToken->tokenable_id);

        if (!$user) {
            return response()->json([
                "status" => false,
                "message" => "user not found"
            ], 404);
        }

        return response()->json([

            "status" => true,
            "message" => "user is authenticated",
            "userData" => [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email
            ]
        ]);
    }

    public function logout(Request $request)
    {
        // echo"request".$request;
        $token = PersonalAccessToken::findToken($request->bearerToken());

        Auth::logout();
        if ($token) {
            $token->delete();
        }
        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ]);
    }
}
