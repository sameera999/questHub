using DbUp;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using QuestHub.Authorization;
using QuestHub.Data;
using System.Diagnostics;
using System.Net.WebSockets;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

// Configure JWT Bearer Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.Authority = builder.Configuration["Auth0:Authority"];
    options.Audience = builder.Configuration["Auth0:Audience"];
});
builder.Services.AddHttpClient();
builder.Services.AddAuthorization(options =>
    options.AddPolicy("MustBeQuestionAuthor", policy
     =>
      policy.Requirements
        .Add(new MustBeQuestionAuthorRequirement())));

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
builder.Services.AddScoped<IAuthorizationHandler, MustBeQuestionAuthorHandler>();
builder.Services.AddHttpContextAccessor();

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

// enable routings for api
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});


app.Run();
