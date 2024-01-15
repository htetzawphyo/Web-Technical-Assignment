<?php

namespace App\Helper;

use Illuminate\Support\Facades\Storage;

class UploadHelper
{
    public static function uploadImage($to, $file)
    {
        $img_name = time() . '_' . $file->getClientOriginalName();
        Storage::put("public/$to/$img_name", file_get_contents($file));

        return $img_name;
    }

    public static function updateImage($to, $oldImg, $newImg)
    {
        Storage::delete("public/$to/$oldImg");

        $img_name = time() . '_' . $newImg->getClientOriginalName();
        Storage::put("public/$to/$img_name", file_get_contents($newImg));

        return $img_name;
    }

    public static function deleteImage($to, $imageName)
    {
        Storage::delete("public/$to/$imageName");
    }
}