using ApiDelivery.Entities;
using Microsoft.EntityFrameworkCore;

namespace ApiDelivery.Data
{
    public class DeliveryRepository
    {
        private DeliveryContext Context { get; }

        public DeliveryRepository(DeliveryContext context)
        {
            Context = context;
        }

        public ICollection<DeliveryDTO> GetAll()
        {
            ICollection<DeliveryDTO> list = Context.Database
                .SqlQuery<DeliveryDTO>($"SELECT d.id, CONCAT(a.`name`, ', ', a.`number`, ' - ', a.neighborhood) as address, CONCAT(c.`name`, ' ', c.lastname) AS customer, o.`name` AS `order`, d.`data` FROM delivery d\r\nJOIN address a ON d.address_id = a.id\r\nJOIN customer c ON d.customer_id = c.id\r\nJOIN `order` o ON d.order_id = o.id;").ToList();

            return list;
        }

        public Delivery? Get(int id)
            => Context.Delivery.FirstOrDefault(x => x.Id == id);

        public void Create(Delivery obj)
        {
            Context.Delivery.Add(obj);
            Context.SaveChanges();
        }

        public void Update(Delivery obj)
        {
            Context.Delivery.Update(obj);
            Context.SaveChanges();
        }

        public void Delete(Delivery obj)
        {
            Context.Delivery.Remove(obj);
            Context.SaveChanges();
        }
    }
}
