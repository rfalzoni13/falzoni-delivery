<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Interfaces\InterfaceCustomerService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use InvalidArgumentException;
use Symfony\Component\Translation\Exception\NotFoundResourceException;
use Throwable;

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
            
        } catch (Exception | Throwable $ex) {
            return response($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function get(int $id)
    {
        try {
            $customer = $this->service->get($id);
            return response()->json($customer);
        } catch (NotFoundResourceException $ex) {
            return response($ex->getMessage(), Response::HTTP_NOT_FOUND);
        } catch (Exception | Throwable $ex) {
            return response($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function create(Request $request)
    {
        try {
            $obj = $request->all();
            $id = $this->service->create($obj);
            return response()->noContent(Response::HTTP_CREATED, ["Location" => url("/api/customer/".$id)]);
        } catch (InvalidArgumentException $ex) {
            return response($ex->getMessage(), Response::HTTP_BAD_REQUEST);
        } catch (Exception | Throwable $ex) {
            return response($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(Request $request)
    {
        try {
            $obj = $request->all();
            $this->service->update($obj);
            return response()->noContent();
        } catch (InvalidArgumentException $ex) {
            return response($ex->getMessage(), Response::HTTP_BAD_REQUEST);
        } catch (Exception | Throwable $ex) {
            return response($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function delete(int $id)
    {
        try {
            $this->service->delete($id);
            return response()->noContent();
        } catch (NotFoundResourceException $ex) {
            return response($ex->getMessage(), Response::HTTP_NOT_FOUND);
        } catch (Exception | Throwable $ex) {
            return response($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
