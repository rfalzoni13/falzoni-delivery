<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Interfaces\InterfaceCustomerService;
use Exception;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    private InterfaceCustomerService $service;

    public function __construct(InterfaceCustomerService $service)
    {
        $this->service = $service;
    }

    public function getAll()
    {
        try {
            $customers = $this->service->getAll();
            return response()->json($customers);
        } catch (Exception $ex) {
            return response()->json($ex->getMessage(), 400);
        }
    }

    public function get(int $id)
    {
        try {
            $customer = $this->service->get($id);
            return response()->json($customer);
        } catch (Exception $ex) {
            return response()->json($ex->getMessage(), 400);
        }
    }

    public function create(Request $request)
    {
        try {
            $obj = $request->all();
            $this->service->create($obj);
            return response()->json("Registro inserido com sucesso!", 201);
        } catch (Exception $ex) {
            return response()->json($ex->getMessage(), 400);
        }
    }

    public function update(Request $request)
    {
        try {
            $obj = $request->all();
            $this->service->update($obj);
            return response()->json("Registro atualizado com sucesso!");
        } catch (Exception $ex) {
            return response()->json($ex->getMessage(), 400);
        }
    }

    public function delete(int $id)
    {
        try {
            $this->service->delete($id);
            return response()->json("Registro removido com sucesso!");
        } catch (Exception $ex) {
            return response()->json($ex->getMessage(), 400);
        }
    }
}
