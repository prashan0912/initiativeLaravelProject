<?php
namespace App\Http\Controllers;
use App\Models\Cart;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\PersonalAccessToken;

class CartController extends Controller
{
    public function getCart(Request $request)
    {
        // $token = $request->bearerToken();
        // if (!$token) {
        //     return response()->json([
        //         "status" => false,
        //         "message" => "Token not provided"
        //     ], 401);
        // }

        // $accessToken = PersonalAccessToken::findToken($token);
    
        // if (!$accessToken) {
        //     return response()->json([
        //         "status" => false,
        //         "message" => "Invalid token"
        //     ], 401);
        // }

        // $user = User::find($accessToken->tokenable_id);

        // if (!$user) {
        //     return response()->json([
        //         "status" => false,
        //         "message" => "User not found"
        //     ], 404);
        // }

        // Get user cart items with course details
        // $courses = DB::table('carts')
        //     ->join('courses', 'courses.id', '=', 'carts.course_id')
        //     ->where('carts.user_id', $user->id)
        //     ->select('courses.*')
        //     ->get();


        // $user = $request->user();

        // return response()->json([
        //     "status" => true,
        //     "message" => "Cart fetched successfully",
        //     "userData" => [
        //         "courses" => $courses
        //     ]
        // ]);
    }
}
