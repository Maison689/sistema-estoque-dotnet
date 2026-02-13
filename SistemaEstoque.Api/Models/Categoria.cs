using SistemaEstoque.Api.Models;
using System.Text.Json.Serialization;

public class Categoria
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;

    [JsonIgnore]
    public List<Produto> Produtos { get; set; } = new();
}