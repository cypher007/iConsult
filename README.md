
# I4Policy Manifesto Consultation Tool

## Introduction

I4Policy consultation tool is a web application that allows the public to provide opinions on a sectioned policy draft document and generate reports on collective and individual consultations. The tool has three major components, two of which are web applications one serving the end user and the other the administrator. The third component is a Facebook chat bot which servers as light extension of the end user consultation tool. The platform allows the administrator to upload a sectioned draft policy document keeping track of the sections as well as body texts under each. These sections of the document will then be availed to end users via the end user web application which allows the user to create an account, provide feedback, annotate on phrases or sentences after logging in. End users can also use the Facebook chat bot to register and/or login and provide feedbacks and comments on the uploaded draft policy document. All feedbacks and comments will be then be analyzed on the administrator web application on which reports with various parameters are provided. The platform frontend is built using Veu.JS and the backend uses node.js under the loopback API generator frame work for back end. To keep records this tool uses mongo db.

 ![](https://i.ibb.co/bN10SP2/1.png)

1. 1.I4Polciy Admin Panel

This sub component of the consultation tool allows the administrator to compose and submit a draft policy document broken down into sections which contain a set of paragraphs which can be commented on and/or annotated. Document shouldn&#39;t necessarily be a policy document any text that can be broken down into a section or more can be uploaded to gather comments and annotations.

 ![](https://i.ibb.co/MgMrMBw/2.png)

Admin panel of i4plocy also allows the administrator to keep track of responses gathered from users individually for detailed user feedback analysis without reviling the identity of the consulting individual.  The component also provides an insight dashboard on live consultations using selected performance indicators.

 ![](https://i.ibb.co/2Mp3Nvj/3.png)

Using the admin web application moderator can also manage users that signed up for the consultation that allow to assist users who forgot their login credentials.

 ![](https://i.ibb.co/WBZ6cMN/4.png)

1. 2.I4Policy consultation tool

This component of the tool is complete with a landing page and an authentication module that allows the user to sign-up directly or using other social media accounts. It has a dynamic localization module which allow any developer to translate the key words using into a language of their choosing using a single translation spread sheet. Currently the too is offered in English as well as French.

 ![](https://i.ibb.co/DrWr8Gm/5.png)

The tool allows a logged in user to provide a rating on the document sections as well as provide a comment. The tool also allows a logged in user to provide a general feedback on their experience using the tool. Each section text can also be annotated on by selecting a section or the entire text. For a selected text a user can also provide a comment.



1. 3.I4Policy Consultation Facebook Chat Bot

The chat bot serves as an extension of the consultation tool built to increase accessibility of the tool, allow users to register using their Facebook messenger id and start their consultation via a conversation with the bot. The bot collects rates, reviews and comments from users who have signed up using their Facebook account if now requires a Facebook authentication.


## How to build
1. Clone this repository
2. `cd i4policy-web-client`
3. `make build`