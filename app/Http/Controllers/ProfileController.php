<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Validator;
use App\User;

class ProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function updateUserPassword(Request $request)
    {
        $messages =[
            'required' => ':attribute - обязательное поле',
            'confirmed' => 'Пароли не совпадают'
        ];

        $requestData = json_decode($request->data, true);

        $validator=Validator::make($requestData, [
            'current' => 'required',
            'new_password' => 'required|confirmed',
            'new_password_confirmation' => 'required'
        ], $messages);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()->first()]);
        }

        $user = User::find(Auth::id());

        if (!Hash::check($requestData['current'], $user->password)) {
            return response()->json(['error'=>'Неверный пароль'], 200);
        }
        $user->password = Hash::make($requestData['new_password']);
        $user->save();
        return response()->json(['success'=>'Вы успешно сменили пароль']);
    }

    public function delete(Request $request)
    {
        $user = User::find(Auth::id());

        if (Hash::check($request->password, $user->password)) {
            $user->delete();
        }
    }
}