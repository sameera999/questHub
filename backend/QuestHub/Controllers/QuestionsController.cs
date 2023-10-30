using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuestHub.Data;
using QuestHub.Data.Models;

namespace QuestHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IDataRepository _dataRepository;

        public QuestionsController(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }

        [HttpGet]
        public IEnumerable<QuestionGetManyResponse> GetQuestions()
        {
            var questions = _dataRepository.GetQuestions();
            return questions;
        }
    }
}
