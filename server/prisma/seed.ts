import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Jhon Doe',
      email: 'Jhon.doe@gmail.com',
      avatarUrl: 'https://github.com/alextayron.png'
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      ownerId: user.id,

      participants:{
        create:{
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data:{
      date: '2022-12-20T12:00:00.201Z',
      firstTeamCountryCode: 'DE',
      secoundTeamCountryCode: 'BR',
    }
  })

  await prisma.game.create({
    data:{
      date: '2022-12-20T12:00:00.201Z',
      firstTeamCountryCode: 'BR',
      secoundTeamCountryCode: 'AR',

      guesses:{
        create:{
          firstTeamPoints: 2,
          secoundTeamPoints: 1,

       

          participants: {
            connect:{
              userId_poolId:{
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    },
  })

}
main()