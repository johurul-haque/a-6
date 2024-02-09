import { PipelineStage } from 'mongoose';
import { Query } from './product.interface';

export function queryBuilder(query: Query) {
  const pipelines: Array<PipelineStage> = [];

  let pagination = {
    limit: Number(query.limit) || 10,
    page: Number(query.page) || 1,
    skip: 0,
  };

  if (query.page) {
    pagination.skip = (pagination.page - 1) * pagination.limit;
  }

  if (query.quantity) {
    pipelines.push({
      $match: {
        quantity: { $gte: Number(query.quantity) },
      },
    });
  }

  if (query.frame_material) {
    pipelines.push({
      $match: {
        'frame.material': query.frame_material,
      },
    });
  }

  if (query.frame_shape) {
    pipelines.push({
      $match: {
        'frame.shape': query.frame_shape,
      },
    });
  }

  if (query.min_price) {
    pipelines.push({
      $match: {
        price: {
          $gte: Number(query.min_price) || 0,
        },
      },
    });
  }

  if (query.max_price) {
    pipelines.push({
      $match: {
        price: {
          $lte: Number(query.max_price),
        },
      },
    });
  }

  if (query.lens_type) {
    pipelines.push({
      $match: {
        lens_type: query.lens_type,
      },
    });
  }

  if (query.brand) {
    pipelines.push({
      $match: {
        brand: query.brand,
      },
    });
  }

  if (query.gender) {
    pipelines.push({
      $match: {
        gender: query.gender,
      },
    });
  }

  if (query.color) {
    pipelines.push({
      $match: {
        color: query.color,
      },
    });
  }

  if (query.temple_length) {
    pipelines.push({
      $match: {
        temple_length: Number(query.temple_length),
      },
    });
  }

  if (query.bridge_size) {
    pipelines.push({
      $match: {
        bridge_size: Number(query.bridge_size),
      },
    });
  }

  if (query.hinge_type) {
    pipelines.push({
      $match: {
        hinge_type: query.hinge_type,
      },
    });
  }

  return {
    limit: pagination.limit,
    skip: pagination.skip,
    pipelines,
  };
}
