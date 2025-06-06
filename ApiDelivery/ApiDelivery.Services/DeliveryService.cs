using ApiDelivery.Data;
using ApiDelivery.Entities;

namespace ApiDelivery.Services
{
    public class DeliveryService
    {
        private readonly DeliveryRepository _repository;

        public DeliveryService(DeliveryRepository repository)
        {
            _repository = repository;
        }

        public ICollection<DeliveryDTO> GetAll()
            => _repository.GetAll();

        public Delivery? Get(int id)
            => _repository.Get(id);

        public void Create(Delivery obj)
        {
            Validate(obj);

            _repository.Create(obj);
        }

        public void Update(Delivery obj)
        {
            Validate(obj);

            Delivery? delivery = _repository.Get(obj.Id);

            if (delivery is null) throw new ArgumentNullException("Encomenda não encontrada");

            delivery.AddressId = obj.AddressId;
            delivery.CustomerId = obj.CustomerId;
            delivery.OrderId = obj.OrderId;
            delivery.Data = obj.Data;

            _repository.Update(delivery);
        }

        public void Delete(int id)
        {
            Delivery? obj = _repository.Get(id);

            if (obj is null) throw new ArgumentNullException("Encomenda não encontrada");

            _repository.Delete(obj);
        }

        #region private METHODS
        private void Validate(Delivery delivery)
        {
            if (delivery == null)
                throw new ArgumentNullException("Objeto não encontrado");

            if (delivery.CustomerId == 0)
                throw new InvalidOperationException("Cliente não preenchido");

            if (delivery.AddressId == 0)
                throw new InvalidOperationException("Endereço não preenchido");

            if (delivery.OrderId == 0)
                throw new InvalidOperationException("Pedido não preenchido");

            if (delivery.Data is null)
                throw new InvalidOperationException("Data não preenchida");
        }
        #endregion
    }
}
