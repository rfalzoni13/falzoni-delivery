<?php

namespace App\Interfaces;

interface InterfaceCustomerService
{
    function getAll();
    function get(int $id);
    function create(array $obj);
    function update(array $obj);
    function delete(int $id);
}
