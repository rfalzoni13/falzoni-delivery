using System.ComponentModel.DataAnnotations.Schema;

namespace ApiDelivery.Entities;
public class Delivery
{
    public int Id { get; set; }

    [Column("address_id")]
    public long AddressId { get; set; }

    [Column("customer_id")]
    public int CustomerId { get; set; }

    [Column("order_id")]
    public int OrderId { get; set; }

    [Column("data")]
    public DateTime? Data { get; set; }
}
