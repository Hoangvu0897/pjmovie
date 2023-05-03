import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import MovieCard from '../components/MoviesCard';

const Swiper = ({ movies, onMovieSelect }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const panGestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = translateX.value;
            ctx.startY = translateY.value;
        },
        onActive: (event, ctx) => {
            translateX.value = ctx.startX + event.translationX;
            translateY.value = ctx.startY + event.translationY;
        },
        onEnd: (event) => {
            if (Math.abs(event.translationX) > 100 || Math.abs(event.translationY) > 100) {
                // Nếu người dùng lướt phim với khoảng cách lớn hơn 100, coi như chọn phim
                onMovieSelect(movies[0]);
            } else {
                // Nếu không, trả về vị trí ban đầu
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
            }
        },
    });

    const cardStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value,
                },
            ],
        };
    });

    return (
        <View style={styles.container}>
            {movies.map((movie, index) => {
                if (index === 0) {
                    return (
                        <PanGestureHandler key={movie.id} onGestureEvent={panGestureEvent}>
                            <Animated.View style={[styles.card, cardStyle]}>
                                <MovieCard movie={movie} />
                            </Animated.View>
                        </PanGestureHandler>
                    );
                }

                return (
                    <View key={movie.id} style={[styles.card, styles.inactiveCard]}>
                        <MovieCard movie={movie} />
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        position: 'absolute',
    },
    inactiveCard: {
        opacity: 0.7,
    },
});

export default Swiper;
