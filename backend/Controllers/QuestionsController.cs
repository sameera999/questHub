﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using QuestHub.Data;
using QuestHub.Data.Models;
using System.Diagnostics.Contracts;

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
        public async Task<IEnumerable<QuestionGetManyResponse>> GetQuestions(string? search, bool includeAnswers, int page = 1,int pageSize = 10)
        {
            //extend search questions
            if (string.IsNullOrEmpty(search))
            {
                if (includeAnswers)
                {
                    return await _dataRepository.GetQuestionsWithAnswers();
                }
                else
                {
                    return await _dataRepository.GetQuestions();
                }
                
            }
            else
            {
                return await _dataRepository.GetQuestionsBySearchWithPaging(search, page, pageSize);
            }
        }

        [HttpGet("unanswered")]
        public async Task<IEnumerable<QuestionGetManyResponse>> GetUnansweredQuestions()
        {
            return await _dataRepository.GetUnansweredQuestions();
        }

        [HttpGet("{questionId}")]
        public ActionResult<QuestionGetSingleResponse> GetQuestion(int questionId)
        {
            var question = _dataRepository.GetQuestion(questionId);
            if (question == null)
            {
                return NotFound();
            }

            return question;
        }

        [HttpPost]
        public ActionResult<QuestionGetSingleResponse> PostQuestion(QuestionPostRequest question)
        {
            var savedQuestion = _dataRepository.PostQuestion(new QuestionPostFullRequest
            {
                Title = question.Title,
                Content = question.Content,
                UserId = "1",
                UserName = "bob.test@test.com",
                Created= DateTime.UtcNow
            });
            return CreatedAtAction(nameof(GetQuestion)
                , new {questionId = savedQuestion.QuestionId}
                , savedQuestion);
        }

        [HttpPut("{questionId}")]
        public ActionResult<QuestionGetSingleResponse> PutQuestion(int questionId, QuestionPutRequest questionPutRequest)
        {
            var question = _dataRepository.GetQuestion(questionId);
            if (question.QuestionId == null)
            {
                return NotFound();
            }

            questionPutRequest.Title = string.IsNullOrEmpty(questionPutRequest.Title) 
                ? question.Title : questionPutRequest.Title;
            questionPutRequest.Content = string.IsNullOrEmpty(questionPutRequest.Content) 
                ? question.Content : questionPutRequest.Content;

            var savedQuestion = _dataRepository.PutQuestion(questionId, questionPutRequest);
            return savedQuestion;
        }


        [HttpDelete("{questionId}")]
        public ActionResult DeleteQuestion(int questionId) 
        { 
            var question = _dataRepository.GetQuestion(questionId);
            if (question == null)
            {
                return NotFound();
            }
            _dataRepository.DeleteQuestion(questionId);
            return NoContent();
        }

        [HttpPost("answer")]
        public ActionResult<AnswerGetResponse> PostAnswer(AnswerPostRequest answerPostRequest)
        {
            var quesionExists = _dataRepository.QuestionExists(answerPostRequest.QuestionId.Value);
            if (!quesionExists)
            {
                return NotFound();
            }

            var savedAnswer = _dataRepository.PostAnswer(new AnswerPostFullRequest
            {
                QuestionId = answerPostRequest.QuestionId.Value,
                Content = answerPostRequest.Content,
                UserId = "1",
                UserName = "bob.test@test.com",
                Created = DateTime.UtcNow
            });
            return savedAnswer;
        }
        
    }
}
