// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import {
    SESClient,
    SendEmailCommand
} from "@aws-sdk/client-ses";

// Set up the SES client
const ses = new SESClient({
    region: "us-east-2"
});

export const handler = async (event) => {
    console.log("Event Data: ", event);
    // Parse the incoming data
    let parsedData = JSON.parse(event.body);

    // if (typeof event === 'string') {
    //     try {
    //         parsedData = JSON.parse(data);
    //     } catch (e) {
    //         console.warn('Failed to parse data:', data, e);
    //     }
    // } else {
    //     parsedData = data;
    // }
    const { email, subject, message } = parsedData;

    const command = new SendEmailCommand({
        Destination: {
            // Using the provided email as the recipient
            ToAddresses: ["another.naive.coder@gmail.com"],
        },
        Message: {
            Body: {
                Text: {
                    Data: `From: ${email}\n\n${message}`,
                }, // Using the provided message
            },
            Subject: {
                Data: subject
            }, // Using the provided subject
        },
        // Here, replace with your own source email address
        Source: "another.naive.coder@gmail.com",
    });

    try {
        let response = await ses.send(command);
        // process data.
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Email sent successfully!'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        // Error handling
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};