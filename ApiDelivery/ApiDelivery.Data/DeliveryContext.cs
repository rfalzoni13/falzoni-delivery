using ApiDelivery.Entities;
using Microsoft.EntityFrameworkCore;

namespace ApiDelivery.Data;

public class DeliveryContext : DbContext
{
    public DeliveryContext(DbContextOptions<DeliveryContext> options) : base(options)
    {
    }

    public DbSet<Delivery> Delivery { get; set; }
}
