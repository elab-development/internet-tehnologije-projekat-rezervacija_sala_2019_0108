<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use function Pest\Laravel\json;

class AuthController extends Controller
{
    function register(Request $request)  {
        
        $validator = Validator::make($request->all(), [
            'name'=>'required|string|max:255',
            'email'=>'required|string|max:255|email|unique:users',
            'password'=>'required|string|min:8'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors());
        }
        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password)
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(['data'=>$user, 'access_token'=>$token,'token_type'=>'Bearer']);

    }
    public function login(Request $request)
    {
        $client = new Client(['base_uri' => 'https://identitytoolkit.googleapis.com/v1/']);
        
        try {
            $response = $client->post('accounts:signInWithPassword', [
                'json' => [
                    'email' => $request->email,
                    'password' => $request->password,
                    'returnSecureToken' => true
                ],
                'query' => [
                    'key' => env('FIREBASE_API_KEY')
                ]
            ]);

            $body = json_decode($response->getBody()->getContents(), true);

            // Obrada podataka
            $this->handleAuthentication($body['email'], $body['localId'], $body['idToken'], $body['expiresIn'], $body['localId']);

            return response()->json($body);
        } catch (\GuzzleHttp\Exception\GuzzleException $e) {
            return response()->json(['error' => 'Authentication failed'], 401);
        }
    }
}
