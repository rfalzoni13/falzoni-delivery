<?php

namespace App\Services;

use App\Interfaces\InterfaceCustomerService;
use App\Models\Customer;
use DateTime;
use Exception;
use InvalidArgumentException;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

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
        $this->validate($model);

        $data = $this->model->create($model);

        return $data->id;
    }

    public function update(array $model) {
        $this->validate($model);

        $result = $this->model::where('id', $model["id"]);
        if(!$result->exists())
            throw new Exception('Registro não encontrado');

        $result->update($model);
    }

    public function delete(int $id) {
        $result = $this->model::where('id', $id);
        if(!$result->exists())
            throw new NotFoundResourceException('Registro não encontrado');
        $result->delete();
    }

    // Private Methods
    private function validate(array $model) {
        if(!isset($model["name"]) || $model["name"] == null) {
            throw new InvalidArgumentException("O nome do cliente é obrigatório");
        }

        if(!isset($model["lastname"]) || $model["lastname"] == null) {
            throw new InvalidArgumentException("O sobrenome do cliente é obrigatório");
        }

        if(!isset($model["datebirth"]) || $model["datebirth"] == null) {
            throw new InvalidArgumentException("Data de nascimento é obrigatória");
        }

        if(!isset($model["document"]) || $model["document"] == null) {
            throw new InvalidArgumentException("O sobrenome do cliente é obrigatório");
        }

        if(!isset($model["email"]) || $model["email"] == null) {
            throw new InvalidArgumentException("O sobrenome do cliente é obrigatório");
        }

        if(!isset($model["phone_number"]) || $model["phone_number"] == null) {
            throw new InvalidArgumentException("O sobrenome do cliente é obrigatório");
        }

        if(!isset($model["marital"]) || $model["marital"] == null) {
            throw new InvalidArgumentException("O sobrenome do cliente é obrigatório");
        }
    }
}
