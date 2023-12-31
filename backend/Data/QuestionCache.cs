﻿using Microsoft.Extensions.Caching.Memory;

namespace QuestHub.Data
{
    public class QuestionCache : IQuestionCache
    {
        private MemoryCache _cache { get; set; }
        private string GetCacheKey(int questionId) => $"Question - {questionId}";

        public QuestionCache() { 
            _cache = new MemoryCache(new MemoryCacheOptions { SizeLimit = 100 });
        }
        public QuestionGetSingleResponse Get(int questionId)
        {
            QuestionGetSingleResponse question;
            _cache.TryGetValue(GetCacheKey(questionId), out question);

            return question;
        }

        public void Remove(int questionId)
        {
            throw new NotImplementedException();
        }

        public void Set(QuestionGetSingleResponse question)
        {
            var cacheEntryOptions = new MemoryCacheEntryOptions().SetSize(1);
            _cache.Set(GetCacheKey(question.QuestionId), question, cacheEntryOptions);
        }
    }
}
