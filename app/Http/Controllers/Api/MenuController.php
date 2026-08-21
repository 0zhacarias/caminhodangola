<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ItemMenuService;
use Illuminate\Http\JsonResponse;

class MenuController extends Controller
{
    public function __construct(private readonly ItemMenuService $menu) {}

    public function index(): JsonResponse
    {
        return response()->json(['data' => $this->menu->arvore()]);
    }
}
