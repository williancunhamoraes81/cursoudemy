import NewsRepository from '../repository/newsRepository';

class NewsService{

    search(term, page, perPage){
        return NewsRepository.find({ 'text': new RegExp('.*' + term + '*.', 'i')})
        .skip((page - 1) * perPage)
        .limit(perPage);
    }

    async get(){
        return await NewsRepository.find({}, 'hat title text publishDate').sort({ publishDate: 0});        
    }

    async getById(_id){
        return await NewsRepository.findById(_id);
    }

    async create(news){
        return await NewsRepository.create(news);
    }

    async update(_id, news){
        return await NewsRepository.findByIdAndUpdate(_id, news);
    }

    async delete(_id){
        return await NewsRepository.findByIdAndRemove(_id);
    }
    
}

export default new NewsService();