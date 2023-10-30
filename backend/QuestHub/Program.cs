using DbUp;
using QuestHub.Data;
using System.Net.WebSockets;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
//create a databae if it doesnt exisits
EnsureDatabase.For.SqlDatabase(connectionString);

//look for sql scripts that embeded in the project
//and do db migrations in a transaction
var upgrader = DeployChanges.To
    .SqlDatabase(connectionString, null)
    .WithScriptsEmbeddedInAssembly(System.Reflection.Assembly.GetExecutingAssembly())
    .WithTransaction()
    .Build();
// upgrade DB if there are pending queries
    if (upgrader.IsUpgradeRequired())
    {
        upgrader.PerformUpgrade();
    }

//add data reporsiorie as dependency injections
builder.Services.AddScoped<IDataRepository, DataRepository>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection();
}

app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});


app.Run();
