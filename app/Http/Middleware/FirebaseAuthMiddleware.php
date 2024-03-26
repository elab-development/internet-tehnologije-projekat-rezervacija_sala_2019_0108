<?php

namespace App\Http\Middleware;

use Closure;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Exception\Auth\RevokedIdTokenException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; // Dodato za logovanje

class FirebaseAuthMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $token = str_replace('Bearer ', '', $request->header('Authorization'));

        if (empty($token)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $firebase = (new Factory)->withServiceAccount(base_path(config('services.firebase.credentials')));

        
        try {
            $verifiedIdToken = $firebase->createAuth()->verifyIdToken($token);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unauthorized - Token is invalid'], 401);
        }

        Log::info('Firebase Auth Token verified successfully.', [
            'UID' => $verifiedIdToken->claims()->get('sub'),
        ]);

        $request->attributes->add(['uid' => $verifiedIdToken->claims()->get('sub')]);

        return $next($request);
    }
}
