using ApiDelivery.Entities;
using ApiDelivery.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiDelivery.Application.Routes;
public static class DeliveryRoute
{
    public static WebApplication BuildRoutes(this WebApplication app)
    {
        RouteGroupBuilder routeGroup = app.MapGroup("api/delivery");

        routeGroup.MapGet("/", ([FromServices] DeliveryService service) =>
        {
            try
            {
                ICollection<DeliveryDTO> list = service.GetAll();

                return Results.Ok(list);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex);
                return Results.Text("Ocorreu um erro, tente novamente", statusCode: StatusCodes.Status500InternalServerError);
            }
        });

        routeGroup.MapGet("/{id}", ([FromServices] DeliveryService service, int id) =>
        {
            try
            {
                Delivery? obj = service.Get(id);

                if(obj is null) return Results.Text("Nenhum registro encontrado", statusCode: StatusCodes.Status404NotFound);

                return Results.Ok(obj);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return Results.Text("Ocorreu um erro, tente novamente", statusCode: StatusCodes.Status500InternalServerError);
            }
        });

        routeGroup.MapPost("/", (HttpContext context, [FromServices] DeliveryService service, [FromBody] Delivery obj) =>
        {
            try
            {
                service.Create(obj);

                return Results.Created($"{context.Request.Scheme}://{context.Request.Host}/Delivery/{obj.Id}", null);
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine(ex);
                return Results.Text(ex.Message, statusCode: StatusCodes.Status400BadRequest);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return Results.Text("Ocorreu um erro, tente novamente", statusCode: StatusCodes.Status500InternalServerError);
            }
        });

        routeGroup.MapPut("/", ([FromServices] DeliveryService service, [FromBody] Delivery obj) =>
        {
            try
            {
                service.Update(obj);

                return Results.NoContent();
            }
            catch (InvalidOperationException ex)
            {
                Console.WriteLine(ex);
                return Results.Text(ex.Message, statusCode: StatusCodes.Status400BadRequest);
            }
            catch (ArgumentNullException ex)
            {
                Console.WriteLine(ex);
                return Results.Text("Nenhum registro encontrado", statusCode: StatusCodes.Status404NotFound);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return Results.Text("Ocorreu um erro, tente novamente", statusCode: StatusCodes.Status500InternalServerError);
            }
        });

        routeGroup.MapDelete("/{id}", ([FromServices] DeliveryService service, int id) =>
        {
            try
            {
                service.Delete(id);

                return Results.NoContent();
            }
            catch(ArgumentNullException ex)
            {
                Console.WriteLine(ex);
                return Results.Text("Nenhum registro encontrado", statusCode: StatusCodes.Status404NotFound);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return Results.Text("Ocorreu um erro, tente novamente", statusCode: StatusCodes.Status500InternalServerError);
            }
        });

        return app;
    }
}
