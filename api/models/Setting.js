module.exports = {
    attributes: {
        pubnub_api_key: {
            type: 'string',
            required: true,
        },
        mangopay_api_key: {
            type: 'string',
            required: true,
        },
        mongodb_username: {
            type: 'string',
            required: true,
        },
        mongodb_password: {
            type: 'string',
            required: true,
        },
        mongodb_location: {
            type: 'string',
            required: true,
        },
        default_radius: {
            type: 'int',
            required: true,
        },
        supported_areas: {
            type: 'string',
            required: true,
        },
        job_alert_timeout: {
            type: 'string',
            required: true,
        },
        default_radius: {
            type: 'int',
            required: true,
        },
        default_radius: {
            type: 'int',
            required: true,
        }
    }
}