import NewsService from '../services/newsService';

const resolvers = {

    newslist: async () => await NewsService.get(),
    newsGetById: async (args) => {
        return await NewsService.getById(args)
    },

    addNews: async (args) => {
        return await NewsService.create(args)
    },

    deleteNews: async (args) => {
        return await NewsService.delete(args)
    },

    updateNews: async (args) => {
        return await NewsService.update(args.input._id, args.input)
    }
};

export default resolvers;