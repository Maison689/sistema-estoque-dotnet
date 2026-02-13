using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaEstoque.Api.Data;
using SistemaEstoque.Api.Models;

namespace SistemaEstoque.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : ControllerBase 
    {
        private readonly AppDbContext _context; 

        public ProdutosController(AppDbContext context)
        {
            _context = context;
        }

        //GET:api/produtos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produto>>> GetProdutos()
        {
            return await _context.Produtos.ToListAsync();
        }

        //POST:api/produtos 
        [HttpPost]
        public async Task<ActionResult<Produto>> CreateProduto(Produto produto)
        {
            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProdutos), new { id = produto.Id }, produto);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduto(int id)
        {
            var produto = await _context.Produtos.FindAsync(id);

            if (produto == null)
            {
                return NotFound();
            }

            _context.Produtos.Remove(produto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduto(int id, Produto produto)
        {
            if (id != produto.Id)
            {
                return BadRequest();
            }

            var produtoExistente = await _context.Produtos.FindAsync(id);

            if (produtoExistente == null)
            {
                return NotFound();
            }

            produtoExistente.Nome = produto.Nome;
            produtoExistente.Preco = produto.Preco;
            produtoExistente.Estoque = produto.Estoque;

            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
