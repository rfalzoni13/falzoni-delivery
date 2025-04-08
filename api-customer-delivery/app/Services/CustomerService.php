<?php

namespace App\Services;

use App\Interfaces\InterfaceCustomerService;
use App\Models\Customer;
use Exception;

class CustomerService implements InterfaceCustomerService
{
    private Customer $model;

    /**
     * Create a new class instance.
     */
    public function __construct(Customer $model)
    {
        $this->model = $model;
    }

    public function getAll()
    {
        return $this->model->all();
    }

    public function get(int $id)
    {
        return $this->model->find($id);
    }

    public function create(array $model) {
        $this->model->create($model);
    }

    public function update(array $model) {
        $result = $this->model::where('id', $model["id"]);
        if(!$result->exists())
            throw new Exception('Registro não encontrado');

        $result->update($model);
    }

    public function delete(int $id) {
        $result = $this->model::where('id', $id);
        if(!$result->exists())
            throw new Exception('Registro não encontrado');
        $result->delete();
    }
}
