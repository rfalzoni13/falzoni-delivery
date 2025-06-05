<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Interfaces\InterfaceCustomerService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use InvalidArgumentException;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

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
            return response($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function get(int $id)
    {
        try {
            $customer = $this->service->get($id);

            if($customer == null)
                return response()->noContent(Response::HTTP_NOT_FOUND);
            return response()->json($customer);
        } catch (Exception $ex) {
            return response($ex->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function create(Request $request)
    {
        try {
            $obj = $request->all();
            $id = $this->service->create($obj);
            return response()->noContent(201, ["Location" => url("/api/customer/".$id)]);
        } catch (InvalidArgumentException $ex) {
            return response($ex->getMessage(), Response::HTTP_BAD_REQUEST);
        } catch (Exception $ex) {
            return response($ex->getMessage(), 400);
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
        } catch (Exception $ex) {
            return response($ex->getMessage(), 400);
        }
    }

    public function delete(int $id)
    {
        try {
            $this->service->delete($id);
            return response()->noContent();
        } catch (NotFoundResourceException $ex) {
            return response($ex->getMessage(), Response::HTTP_NOT_FOUND);
        } catch (Exception $ex) {
            return response($ex->getMessage(), 400);
        }
    }
}
