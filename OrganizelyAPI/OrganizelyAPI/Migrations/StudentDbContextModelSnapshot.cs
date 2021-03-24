﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using OrganizelyAPI.Data;

namespace OrganizelyAPI.Migrations
{
    [DbContext(typeof(StudentDbContext))]
    partial class StudentDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.4");

            modelBuilder.Entity("OrganizelyAPI.Models.Assignment", b =>
                {
                    b.Property<int>("AssignmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AssignmentName")
                        .IsRequired()
                        .HasColumnType("varchar(100)");

                    b.Property<int>("CourseId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("Deadline")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("Time")
                        .HasColumnType("datetime");

                    b.HasKey("AssignmentId");

                    b.HasIndex("CourseId");

                    b.ToTable("Assignment");
                });

            modelBuilder.Entity("OrganizelyAPI.Models.Course", b =>
                {
                    b.Property<int>("CourseId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CourseName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("DaysOfWeekStr")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("EndRecur")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("datetime");

                    b.Property<string>("SemesterSeason")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("SemesterYear")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("StartRecur")
                        .HasColumnType("datetime");

                    b.Property<DateTime>("StartTime")
                        .HasColumnType("datetime");

                    b.Property<int>("StudentId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("TeacherName")
                        .HasColumnType("TEXT");

                    b.HasKey("CourseId");

                    b.HasIndex("StudentId");

                    b.ToTable("Course");
                });

            modelBuilder.Entity("OrganizelyAPI.Models.Student", b =>
                {
                    b.Property<int>("StudentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("StudentId");

                    b.ToTable("Student");
                });

            modelBuilder.Entity("OrganizelyAPI.Models.StudentTask", b =>
                {
                    b.Property<int>("StudentTaskId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime");

                    b.Property<DateTime?>("Deadline")
                        .HasColumnType("datetime");

                    b.Property<int>("StudentId")
                        .HasColumnType("integer");

                    b.Property<string>("StudentTaskName")
                        .IsRequired()
                        .HasColumnType("varchar(30)");

                    b.Property<DateTime>("Time")
                        .HasColumnType("datetime");

                    b.HasKey("StudentTaskId");

                    b.HasIndex("StudentId");

                    b.ToTable("StudentTask");
                });

            modelBuilder.Entity("OrganizelyAPI.Models.Assignment", b =>
                {
                    b.HasOne("OrganizelyAPI.Models.Course", "Course")
                        .WithMany()
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Course");
                });

            modelBuilder.Entity("OrganizelyAPI.Models.Course", b =>
                {
                    b.HasOne("OrganizelyAPI.Models.Student", "Student")
                        .WithMany()
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Student");
                });

            modelBuilder.Entity("OrganizelyAPI.Models.StudentTask", b =>
                {
                    b.HasOne("OrganizelyAPI.Models.Student", "Student")
                        .WithMany()
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Student");
                });
#pragma warning restore 612, 618
        }
    }
}
