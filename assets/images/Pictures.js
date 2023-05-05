import * as React from 'react';
import { Appbar, Title,Button,TextInput} from 'react-native-paper';
import {View,Text,SafeAreaView,StyleSheet,TouchableHighlight} from 'react-native'

const Pictures = {
    // TODO: Put better pictures
    pfps: {
        newuser: 'https://cdn.dribbble.com/users/2126214/screenshots/5134447/media/35ae40e3c73721e4a5cca4d3fca93839.gif',
        music: 'https://media.istockphoto.com/id/173696178/photo/musical-notebook.jpg?s=170667a&w=0&k=20&c=Yd5FNeI9h7wckh_t0VdR0HIzuK_lmSoDbkhFHBjZf8Q=',
        art: 'https://t4.ftcdn.net/jpg/00/62/65/29/360_F_62652907_dZgAPIdcVKu8DPCeUPvLRCb9JdHrnpVG.jpg',
        games: 'https://media.istockphoto.com/id/1160866353/photo/crop-hands-with-controller.jpg?s=612x612&w=0&k=20&c=ncOO3s1WfyGNM9dko0GHcqTvjl4sz8dl94o-_C4nir0=',
        animals: 'https://media.istockphoto.com/photos/cat-and-dog-sleeping-puppy-and-kitten-sleep-picture-id1168451046?b=1&k=20&m=1168451046&s=612x612&w=0&h=RPHJBHJrHgXYFRcHx-AvI7c8s-2Jv6NhGmn3oIVtbtA=',
        sports: 'https://img.freepik.com/premium-photo/confident-young-muscular-caucasian-athlete-training-gym-doing-strength-exercises-practicing-work-his-upper-body-with-weights-barbell-fitness-wellness-healthy-lifestyle-concept_489646-8199.jpg',
        reading: 'https://t3.ftcdn.net/jpg/03/32/49/64/360_F_332496418_bDYbL6qL1wW3TAXjUaEyVaukHS53nS2F.jpg',
        business: 'https://g.foolcdn.com/editorial/images/718807/growth-stock-chart.jpg',
        career: 'https://img.jakpost.net/c/2020/03/14/2020_03_14_89218_1584158212._large.jpg',
        movies: 'https://media.istockphoto.com/id/1191001701/photo/popcorn-and-clapperboard.jpg?s=612x612&w=0&k=20&c=iUkFTVuU8k-UCcZDxczTWs6gkRa0nAMihp2Jf_2ASKM=',
        education: 'https://www.ppic.org/wp-content/uploads/graduates-2.jpg',
        health: 'https://www.healthpolicypartnership.com/app/uploads/2021/03/what_is_health.jpg',
        home: 'https://www.gardeningknowhow.com/wp-content/uploads/2019/10/seedling-400x267.jpg',
        comedy: 'https://media.istockphoto.com/id/1186127120/photo/mic-on-a-stage-ready-for-the-singer-or-speaker.jpg?s=612x612&w=0&k=20&c=RIS1l7XtqtZvXwKp1YXGv9-agFcgC9BHbSe6mcHZ1Hw=',
        food: 'https://www.cnet.com/a/img/resize/989e8e3be4eb8baae522f982b7cc1f6a3f4c0f6d/hub/2022/12/14/8af299d7-0c8f-493f-9771-c5b4738cb690/gettyimages-1306753442.jpg?auto=webp&fit=crop&height=675&width=1200',
        travel: 'https://images.unsplash.com/photo-1568323993144-20d546ba585d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80',
        DIY: 'https://i.pinimg.com/736x/76/3d/06/763d0646bae3c13a1a93c3aadb4b52f3.jpg',
        beauty: 'https://cdn-s-www.bienpublic.com/images/3229A8DD-FC69-47CA-8B2C-0D8C3C59114B/NW_raw/photo-adobe-stock-1633709051.jpg',
        tech: 'https://www.springboard.com/blog/wp-content/uploads/2022/08/programming-skills.png',
        auto: 'https://images.unsplash.com/photo-1630053562818-5a16d06eaa31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FyJTIwcGhvdG9zfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        dance: 'https://newsroom.korea.net/upload/content/editImage/20210107182937527_BSV1GHU4.jpg',
    }
};

export default Pictures;