<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Patient;
use Symfony\Component\HttpFoundation\Response;

class PatientApiAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Access token required'
            ], 401);
        }

        $patient = Patient::where('api_token', $token)->first();

        if (!$patient) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid access token'
            ], 401);
        }

        if (!$patient->is_active) {
            return response()->json([
                'success' => false,
                'message' => 'Account is deactivated'
            ], 403);
        }

        // Add patient to request for easy access in controllers
        $request->merge(['patient' => $patient]);
        $request->setUserResolver(function () use ($patient) {
            return $patient;
        });

        return $next($request);
    }
}
