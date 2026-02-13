namespace SistemaEstoque.Api.Models
{
    public class Produto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public decimal Preço { get; set; }
        public int Estoque { get; set; }
    }
}
