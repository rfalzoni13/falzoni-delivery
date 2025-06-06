namespace ApiDelivery.Entities
{
    public record DeliveryDTO(int Id, string Address, string Customer, string Order, DateTime Data)
    {
    }
}
