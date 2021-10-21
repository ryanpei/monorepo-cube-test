cube(`Orders`, {
  sql: `SELECT * FROM public.orders`,
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started
    main: {
      measures: [Orders.count],
      dimensions: [Orders.status],
      timeDimension: Orders.completedAt,
      granularity: `week`
    },
    main2: {
      measures: [Orders.number],
      timeDimension: Orders.createdAt,
      granularity: `day`
    },
    main3: {
      measures: [Orders.number],
      timeDimension: Orders.createdAt,
      granularity: `hour`
    }
  },
  joins: {},
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, createdAt]
    },
    number: {
      sql: `number`,
      type: `sum`
    }
  },
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primaryKey: true
    },
    status: {
      sql: `status`,
      type: `string`
    },
    createdAt: {
      sql: `created_at`,
      type: `time`
    },
    completedAt: {
      sql: `completed_at`,
      type: `time`
    }
  },
  dataSource: `default`
});