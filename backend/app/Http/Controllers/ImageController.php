<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class ImageController extends Controller
{

    public function upload(Request $request)
    {
        $uploadedFile = Cloudinary::upload($request->file('image')->getRealPath());

        return response()->json([
            'url' => $uploadedFile->getSecurePath()
        ]);
    }
}
