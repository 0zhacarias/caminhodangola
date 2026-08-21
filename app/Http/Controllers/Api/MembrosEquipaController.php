<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\MembroEquipaService;
use Illuminate\Http\JsonResponse;

class MembrosEquipaController extends Controller
{
    public function __construct(private readonly MembroEquipaService $membros) {}

    public function index(): JsonResponse
    {
        return response()->json(['data' => $this->membros->listarAtivos()]);
    }
}
