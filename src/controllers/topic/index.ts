import { Body, Param, Query } from '@nestjs/common';
import { TopicDecorator } from '~/decorators/topic';
import { Topic, zTopic } from '~/entities/topic';
import { TopicService } from '~/services/topic';
import { DeleteTopicParameter, GetTopicParameter } from '~/api/parameters/topic';
import { GetTopicsQuery } from '~/api/queries/topic';

@TopicDecorator.Controller
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @TopicDecorator.Create
  async createPost(@Body() body: Topic) {
    return await this.topicService.create(zTopic.parse(body));
  }

  @TopicDecorator.Get
  async getUsers(@Query() query?: GetTopicsQuery) {
    return await this.topicService.find(query);
  }

  @TopicDecorator.GetMany
  async getUser(@Param() param: GetTopicParameter) {
    return await this.topicService.findOne(param);
  }

  @TopicDecorator.Delete
  async deleteUser(@Param() params: DeleteTopicParameter) {
    return await this.topicService.delete(params);
  }

  @TopicDecorator.Update
  async updateUser(@Body() body: Topic) {
    return await this.topicService.update(body);
  }
}
