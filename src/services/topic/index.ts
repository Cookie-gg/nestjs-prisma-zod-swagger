import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '~/services/prisma';
import { DeleteTopicParameter, GetTopicParameter } from '~/api/parameters/topic';
import { Topic } from '~/entities/topic';
import { topicConverter } from '~/libs/converters/topic';
import { GetTopicsQuery } from '~/api/queries/topic';

@Injectable()
export class TopicService {
  constructor(private readonly prisma: PrismaService) {}

  async create(topic: Topic): Promise<Topic> {
    return this.prisma.topic.create({ data: topic });
  }

  async find(query?: GetTopicsQuery): Promise<Topic[]> {
    const where = topicConverter.getMany(query);
    return this.prisma.topic.findMany({ where });
  }

  async findOne(param: GetTopicParameter): Promise<Topic> {
    const where = topicConverter.get(param);
    const topic = await this.prisma.topic.findUnique({ where });
    if (!topic) throw new NotFoundException('A topic is not found');
    return topic;
  }

  async update(topic: Topic): Promise<Topic> {
    const where = topicConverter.get({ id: topic.name });
    return this.prisma.topic.update({ where, data: topic });
  }

  async delete(param: DeleteTopicParameter): Promise<void> {
    const where = topicConverter.delete(param);
    await this.prisma.topic.delete({ where });
  }

  async count() {
    return this.prisma.topic.count();
  }

  async clear() {
    this.prisma.topic.deleteMany();
  }
}
